<form method="GET">
    <input type="text" name="pokemon" placeholder="Digite um Pokémon">
    <button type="submit">Buscar</button>
</form>

<?php

if(isset($_GET['pokemon'])){

    $pokemon = strtolower($_GET['pokemon']);
    $url = "https://pokeapi.co/api/v2/pokemon/".$pokemon;

    $resposta = @file_get_contents($url);

    if($resposta){

        $dados = json_decode($resposta);

        echo "<h1>".ucfirst($dados->name)."</h1>";

        echo "<img src='".$dados->sprites->front_default."'>";

        echo "<p><strong>Altura:</strong> ".$dados->height."</p>";
        echo "<p><strong>Peso:</strong> ".$dados->weight."</p>";

        echo "<h3>Tipos</h3>";
        foreach($dados->types as $tipo){
            echo "<p>".$tipo->type->name."</p>";
        }

        echo "<h3>Habilidades</h3>";
        foreach($dados->abilities as $habilidade){
            echo "<p>".$habilidade->ability->name."</p>";
        }

        echo "<h3>Estatísticas</h3>";
        foreach($dados->stats as $stat){
            echo "<p>".$stat->stat->name.": ".$stat->base_stat."</p>";
        }

    } else {
        echo "<p>Pokemon não encontrado.</p>";
    }
}
?>