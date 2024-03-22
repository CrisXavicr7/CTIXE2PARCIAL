<?php
include_once('config.php');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST');
header('Access-Control-Allow-Headers: Origin, Content-Type, Authorization, Accept, X-Requested-With, x-xsrf-token'); 
header('Content-Type: application/json; charset=utf-8');
date_default_timezone_set('America/Bogota');

$respuesta = "";
$post = json_decode(file_get_contents("php://input"), true);
if ($post['accion'] == 'loggin') 
{
    $sentencia = sprintf("SELECT * FROM persona WHERE ci_persona='%s' AND clave_persona='%s'", $post['usuario'], $post['clave']);
    $rs = mysqli_query($mysqli, $sentencia);    
    if (mysqli_num_rows($rs) > 0) 
    {
        $row = mysqli_fetch_array($rs);
        $datos[0] = array(
            'codigo' => $row['cod_persona'], 
            'nombre' => $row['nom_persona'],
            'apellido' => $row['ape_persona']
        );
        $respuesta = json_encode(array('estado' => true, 'persona' => $datos));
    } else 
    {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => "Usuario o clave incorrecto"));
    }
    echo $respuesta;
    exit;
}
if ($post['accion'] == 'verificarCedula') {
    $cedula = mysqli_real_escape_string($mysqli, $post['cedula']);
    $query = "SELECT ci_persona FROM persona WHERE ci_persona='{$cedula}'";
    $result = mysqli_query($mysqli, $query);

    if ($result && mysqli_num_rows($result) > 0) {
        $respuesta = json_encode(array('estado' => true));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => "Cédula no encontrada"));
    }
    echo $respuesta;
    exit;
}

if ($post['accion'] == 'cambiarClave') {
    $cedula = mysqli_real_escape_string($mysqli, $post['cedula']);
    $nuevaClave = mysqli_real_escape_string($mysqli, $post['nuevaClave']);
    
    
    $updateQuery = "UPDATE persona SET clave_persona='{$nuevaClave}' WHERE ci_persona='{$cedula}'";
    $updateResult = mysqli_query($mysqli, $updateQuery);
    
    if ($updateResult) {
        $respuesta = json_encode(array('estado' => true));
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => "Error al actualizar la contraseña"));
    }
    echo $respuesta;
    exit;
}
if ($post['accion'] == 'insertar_puestos') {

    if (!isset($post['numero']) || !isset($post['nuevo_dia'])) {
        die(json_encode(["success" => false, "message" => "Datos de entrada inválidos o incompletos."]));
    }
    $numero = $post['numero'];
    $nuevoDia = $post['nuevo_dia'] == 'si';
    $mysqli->begin_transaction();
    try {
        if ($nuevoDia) {
            $mysqli->query("DELETE FROM parking");
        }

        if ($numero >= 1 && $numero <= 25) {
            $stmt = $mysqli->prepare("INSERT INTO parking (id_puesto) VALUES (?)");
            for ($i = 1; $i <= $numero; $i++) {
                $stmt->bind_param("i", $i); 
                $stmt->execute();
            }
            $stmt->close();
            $mysqli->commit();

            echo json_encode(["success" => true, "message" => "Puestos agregados correctamente."]);
        } else {
            echo json_encode(["success" => false, "message" => "Número fuera de rango."]);
        }
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => "Ha ocurrido un error: " . $e->getMessage()]);
        exit;
    } 
} 

if ($post['accion'] == 'verificarPuestos') {
    $queryLibres = "SELECT * FROM parking WHERE estado = 'libre'";
    $resultLibres = $mysqli->query($queryLibres);

    if ($resultLibres === false) {
         $respuesta = [
            'success' => false,
            'message' => "Error al consultar puestos libres: " . $mysqli->error
        ];
    } else {
        $puestosLibres = mysqli_fetch_all($resultLibres, MYSQLI_ASSOC);

        $queryOcupados = "SELECT COUNT(*) as cantidadOcupados FROM parking WHERE estado = 'ocupado'";
        $resultOcupados = $mysqli->query($queryOcupados);

        if ($resultOcupados === false) {
                 $respuesta = [
                'success' => false,
                'message' => "Error al consultar puestos ocupados: " . $mysqli->error
            ];
        } else {
            $cantidadOcupados = mysqli_fetch_assoc($resultOcupados)['cantidadOcupados'];
            $respuesta = [
                'puestosLibres' => $puestosLibres,
                'totalLibres' => count($puestosLibres),
                'totalOcupados' => $cantidadOcupados,
                'success' => true
            ];
        }
    }

    echo json_encode($respuesta);
    exit;
}
if ($post['accion'] == 'ingresar_valor') {
    $valorHora = mysqli_real_escape_string($mysqli, $post['valorHora']);

    $updateQuery = "UPDATE parking SET precio_por_hora='{$valorHora}' WHERE id_puesto IS NOT NULL";
    $updateResult = mysqli_query($mysqli, $updateQuery);

    if ($updateResult) {
        if (mysqli_affected_rows($mysqli) > 0) {
            $respuesta = json_encode(array('estado' => true, 'mensaje' => 'Valor por hora actualizado correctamente.'));
        } else {
            $respuesta = json_encode(array('estado' => false, 'mensaje' => 'No se actualizaron los registros. Es posible que el valor no haya cambiado o no existan registros.'));
        }
    } else {
        $respuesta = json_encode(array('estado' => false, 'mensaje' => 'Error al actualizar el valor por hora.'));
    }
    echo $respuesta;
    exit;
}

if ($post['accion'] == 'registrar_v') {
    $placa = isset($post['i_placa']) ? $post['i_placa'] : null;
    if ($placa === null) {
        echo json_encode(['estado' => false, 'mensaje' => 'La placa del vehículo es requerida.']);
        exit;
    }
    $queryPlaca = "SELECT i_placa FROM parking WHERE i_placa = ?";
    $stmtPlaca = $mysqli->prepare($queryPlaca);
    $stmtPlaca->bind_param('s', $placa);
    $stmtPlaca->execute();
    $resultPlaca = $stmtPlaca->get_result();
    if ($resultPlaca->num_rows > 0) {
        echo json_encode(['estado' => false, 'mensaje' => 'La placa del vehículo ya está registrada.']);
        exit;
    }

    $queryVerificar = "SELECT id_puesto FROM parking WHERE estado = 'libre' LIMIT 1";
    $stmtVerificar = $mysqli->prepare($queryVerificar);
    $stmtVerificar->execute();
    $resultVerificar = $stmtVerificar->get_result();

    if ($fila = $resultVerificar->fetch_assoc()) {
        $idPuesto = $fila['id_puesto'];
        $horaEntrada = date('H:i:s');
        
        $queryRegistro = "UPDATE parking SET i_placa = ?, hora_entrada = ?, estado = 'ocupado' WHERE id_puesto = ?";
        $stmtRegistro = $mysqli->prepare($queryRegistro);
        
        if (!$stmtRegistro) {
            echo json_encode(['estado' => false, 'mensaje' => 'Error al preparar la consulta de registro.']);
            exit;
        }

        $stmtRegistro->bind_param('ssi', $placa, $horaEntrada, $idPuesto);
        if (!$stmtRegistro->execute()) {
            echo json_encode(['estado' => false, 'mensaje' => 'Error al ejecutar la consulta de registro.']);
            exit;
        }
        $stmtRegistro->close();
        
        echo json_encode(['estado' => true, 'mensaje' => "Vehículo registrado con éxito en puesto " . $idPuesto . "."]);
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'No hay puestos libres disponibles.']);
    }
    exit;
}

if ($post['accion'] == 'registrar_salida') {
    $placa = isset($post['i_placa']) ? $post['i_placa'] : null;

    if ($placa === null) {
        echo json_encode(['estado' => false, 'mensaje' => 'La placa del vehículo es requerida para registrar la salida.']);
        exit;
    }

    // Buscar el registro del vehículo por su placa
    $queryBuscar = "SELECT id_puesto, precio_por_hora, hora_entrada FROM parking WHERE i_placa = ?";
    $stmtBuscar = $mysqli->prepare($queryBuscar);
    $stmtBuscar->bind_param('s', $placa);
    $stmtBuscar->execute();
    $resultBuscar = $stmtBuscar->get_result();

    if ($fila = $resultBuscar->fetch_assoc()) {
        $idPuesto = $fila['id_puesto'];
        $precioPorHora = $fila['precio_por_hora'];
        $horaEntrada = new DateTime($fila['hora_entrada']);
        $horaSalida = new DateTime();
        $horaSalida->add(new DateInterval('PT2H15M'));
        $intervalo = $horaEntrada->diff($horaSalida);
        $horas = $intervalo->h + ($intervalo->i / 60);
        $montoCobrado = $horas * $precioPorHora;
        $montoCobrado = number_format($montoCobrado, 2, '.', '');
        $queryActualizar = "UPDATE parking SET estado = 'libre', hora_salida = ?, monto_cobrado = ?, i_placa = NULL WHERE i_placa = ?";
        $stmtActualizar = $mysqli->prepare($queryActualizar);
        $horaSalidaFormato = $horaSalida->format('Y-m-d H:i:s');
        $stmtActualizar->bind_param('sds', $horaSalidaFormato, $montoCobrado, $placa);
        if ($stmtActualizar->execute()) {
            echo json_encode([
                'estado' => true, 
                'mensaje' => "Salida del vehículo registrada con éxito. Total a pagar: $" . $montoCobrado,
                'monto_cobrado' => $montoCobrado
            ]);
        } else {
            echo json_encode(['estado' => false, 'mensaje' => 'Error al registrar la salida del vehículo.']);
        }
        $stmtActualizar->close();
    } else {
        echo json_encode(['estado' => false, 'mensaje' => 'Vehículo no encontrado con la placa proporcionada.']);
    }
    exit;
}

?>
