<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $nome = htmlspecialchars(trim($_POST['nome']));
    $telefone = htmlspecialchars(trim($_POST['telefone']));
    $email = htmlspecialchars(trim($_POST['email']));
    $assunto = htmlspecialchars(trim($_POST['assunto']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    try {
        $pdo = new PDO('sqlite:../database/contatos.db');

        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // SQL Statement to insert data

        $sql = "INSERT INTO contatos (nome, telefone, email, assunto, mensagem) VALUES (:nome, :telefone, :email, :assunto, :mensagem)";

        $stmt = $pdo->prepare($sql);

        // Bind parametros
        $stmt->bindParam(':nome', $nome);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':assunto', $assunto);
        $stmt->bindParam(':mensagem', $mensagem);

        $stmt->execute();
        
        echo "Dados inseridos com sucesso!";
    } catch (PDOException $e) {
        echo "Erro ao inserir dados: " . $e->getMessage();
    }

} else {
    echo "Acesso inválido.";
}
?>