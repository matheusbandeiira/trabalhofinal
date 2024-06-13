window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};
function calcular() {
    const { idade, peso, altura } = recuperarDados(); 
    document.getElementById("resultado").classList.add("resultado-visivel");
    document.getElementById("resultado").classList.remove("resultado-oculto");

    // Calcular preços dos planos para operadora A
    const imc = calcularImc(peso, altura);
    const precoBasicoA = 100 + (idade * 10 * (imc / 10));
    const precoStandardA = (150 + (idade * 15)) * (imc / 10);
    const precoPremiumA = (200 - (imc * 10) + (idade * 20)) * (imc / 10);

    // Calcular preços dos planos para operadora B
    const fatorComorbidade = determinarFatorComorbidade(imc);
    const precoBasicoB = 100 - (fatorComorbidade * 10 * (imc / 10));
    const precoStandardB = (150 + (fatorComorbidade * 15)) * (imc / 10);
    const precoPremiumB = (200 - (imc * 10) + (fatorComorbidade * 20)) * (imc / 10);

    // Atualizar valores nos cards dos planos para operadora A
    document.getElementById("precoBasicoA").textContent = "R$ " + precoBasicoA.toFixed(2);
    document.getElementById("precoStandardA").textContent = "R$ " + precoStandardA.toFixed(2);
    document.getElementById("precoPremiumA").textContent = "R$ " + precoPremiumA.toFixed(2);

    // Atualizar valores nos cards dos planos para operadora B
    document.getElementById("precoBasicoB").textContent = "R$ " + precoBasicoB.toFixed(2);
    document.getElementById("precoStandardB").textContent = "R$ " + precoStandardB.toFixed(2);
    document.getElementById("precoPremiumB").textContent = "R$ " + precoPremiumB.toFixed(2);

    // Mostrar resultados
    mostrarCards();
}

function mostrarCards() {
    document.getElementById('comparacaoPrecos').style.display = 'none';
    document.getElementById('resultado').style.display = 'block';
}

function mostrarTabela() {
    document.getElementById('comparacaoPrecos').style.display = 'block';
    document.getElementById('resultado').style.display = 'none';

    const precoBasicoA = parseFloat(document.getElementById("precoBasicoA").textContent.replace("R$ ", ""));
    const precoStandardA = parseFloat(document.getElementById("precoStandardA").textContent.replace("R$ ", ""));
    const precoPremiumA = parseFloat(document.getElementById("precoPremiumA").textContent.replace("R$ ", ""));
    const precoBasicoB = parseFloat(document.getElementById("precoBasicoB").textContent.replace("R$ ", ""));
    const precoStandardB = parseFloat(document.getElementById("precoStandardB").textContent.replace("R$ ", ""));
    const precoPremiumB = parseFloat(document.getElementById("precoPremiumB").textContent.replace("R$ ", ""));

    if (!isNaN(precoBasicoA) && !isNaN(precoStandardA) && !isNaN(precoPremiumA) &&
        !isNaN(precoBasicoB) && !isNaN(precoStandardB) && !isNaN(precoPremiumB)) {

        // Exibir valores na tabela de comparação de preços
        document.getElementById("precoBasicoATexto").textContent = "R$ " + precoBasicoA.toFixed(2);
        document.getElementById("precoStandardATexto").textContent = "R$ " + precoStandardA.toFixed(2);
        document.getElementById("precoPremiumATexto").textContent = "R$ " + precoPremiumA.toFixed(2);
        document.getElementById("precoBasicoBTexto").textContent = "R$ " + precoBasicoB.toFixed(2);
        document.getElementById("precoStandardBTexto").textContent = "R$ " + precoStandardB.toFixed(2);
        document.getElementById("precoPremiumBTexto").textContent = "R$ " + precoPremiumB.toFixed(2);

        // Calcular o plano mais vantajoso
        const menorPrecoA = Math.min(precoBasicoA, precoStandardA, precoPremiumA);
        const menorPrecoB = Math.min(precoBasicoB, precoStandardB, precoPremiumB);

        let planoMaisVantajoso = "";

        if (menorPrecoA < menorPrecoB) {
            planoMaisVantajoso = "VitalCare Saúde";
        } else if (menorPrecoB < menorPrecoA) {
            planoMaisVantajoso = "MedSecure Planos";
        } else {
            planoMaisVantajoso = "Empate";
        }

        // Exibir o plano mais vantajoso na tabela
        document.getElementById("planoMaisVantajoso").textContent = planoMaisVantajoso;
    } else {
        console.error("Erro: Um ou mais valores de preço são inválidos.");
    }
}

function recuperarDados() {
    const idade = parseInt(document.getElementById("idade").value);
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    return { idade, peso, altura };
}

function calcularImc(peso, altura) {
    return peso / (altura * altura);
}

function determinarFatorComorbidade(imc) {
    if (imc < 18.5) {
        return 10; // abaixo do peso
    } else if (imc >= 18.5 && imc < 25) {
        return 1; // normal
    } else if (imc >= 25 && imc < 30) {
        return 6; // sobrepeso
    } else if (imc >= 30 && imc < 35) {
        return 10; // obesidade
    } else if (imc >= 35 && imc < 40) {
        return 20; // obesidade mórbida grave
    } else {
        return 30; // obesidade mórbida muito grave
    }
}