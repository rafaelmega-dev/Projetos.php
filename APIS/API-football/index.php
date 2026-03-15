<form method="GET">
    <input type="text" name="jogador" placeholder="Digite um jogador">
    <button type="submit">Buscar</button>
</form>

<?php

if(isset($_GET['jogador'])){

    $jogador = urlencode($_GET['jogador']);

    $url = "https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=".$jogador;

    $resposta = file_get_contents($url);

    $dados = json_decode($resposta);

    if(!empty($dados->player)){

        $player = $dados->player[0];

        echo "<h1>".$player->strPlayer."</h1>";

        echo "<img src='".$player->strThumb."' width='200'><br>";

        echo "<strong>Time:</strong> ".$player->strTeam."<br>";
        echo "<strong>Posição:</strong> ".$player->strPosition."<br>";
        echo "<strong>Nacionalidade:</strong> ".$player->strNationality."<br>";
        echo "<strong>Data de nascimento:</strong> ".$player->dateBorn."<br>";

        echo "<p>".$player->strDescriptionEN."</p>";

    } else {

        echo "Jogador não encontrado.";

    }

}
?>