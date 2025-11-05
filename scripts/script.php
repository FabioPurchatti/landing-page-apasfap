<?php
// Define o tipo de conteúdo da resposta como JSON
header('Content-Type: application/json');

// Prepara um array para a resposta
$response = array('success' => false, 'message' => 'Método de requisição inválido.');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Validação básica (verificar se campos essenciais não estão vazios)
    if (empty($_POST['nome']) || empty($_POST['email']) || empty($_POST['mensagem'])) {
        $response['message'] = 'Por favor, preencha os campos obrigatórios (Nome, E-mail, Mensagem).';
        echo json_encode($response);
        exit;
    }

    $nome = htmlspecialchars(trim($_POST['nome']));
    $telefone = htmlspecialchars(trim($_POST['telefone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $assunto = htmlspecialchars(trim($_POST['assunto']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    // Validação de e-mail
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
         $response['message'] = 'Formato de e-mail inválido.';
         echo json_encode($response);
         exit;
    }

    try {
        // Caminho relativo do PHP para o banco de dados
        $pdo = new PDO('sqlite:../database/contatos.db');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO contatos (nome, telefone, email, assunto, mensagem) VALUES (:nome, :telefone, :email, :assunto, :mensagem)";
        $stmt = $pdo->prepare($sql);

        // Bind parametros
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':assunto', $assunto);
        $stmt->bindParam(':mensagem', $mensagem);

        $stmt->execute();
        
        // Sucesso
        $response['success'] = true;
        $response['message'] = 'Mensagem enviada com sucesso!';

    } catch (PDOException $e) {
        // Erro de banco de dados
        // Em produção, é melhor logar $e->getMessage() e enviar uma msg genérica
        $response['message'] = 'Erro ao salvar no banco de dados. Tente novamente.';
        // $response['message'] = 'Erro ao inserir dados: ' . $e->getMessage(); // Para depuração
    }

}

// Envia a resposta JSON
echo json_encode($response);
?>