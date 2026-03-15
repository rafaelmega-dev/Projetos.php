<form method="GET">
    <input type="text" name="anime" placeholder="Digite um anime">
    <button type="submit">Buscar</button>
</form>

<?php

if(isset($_GET['anime'])){

    $anime = urlencode($_GET['anime']);

    $url = "https://api.jikan.moe/v4/anime?q=".$anime."&limit=1";

    $resposta = @file_get_contents($url);

    if($resposta){

        $dados = json_decode($resposta);

        if(!empty($dados->data)){

            $anime = $dados->data[0];

            echo "<h1>".$anime->title."</h1>";

            echo "<img src='".$anime->images->jpg->image_url."' width='200'>";

            echo "<p><strong>Nota:</strong> ".$anime->score."</p>";
            echo "<p><strong>Episódios:</strong> ".$anime->episodes."</p>";
            echo "<p><strong>Status:</strong> ".$anime->status."</p>";
            echo "<p><strong>Sinopse:</strong> ".$anime->synopsis."</p>";

        } else {
            echo "Anime não encontrado.";
        }

    } else {
        echo "Erro ao acessar a API.";
    }

}
?>