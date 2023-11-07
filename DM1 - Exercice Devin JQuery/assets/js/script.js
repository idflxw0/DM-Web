$(document).ready(function () {
    let max_try = 6;
    let try_count = 0;

    const genRandom = () => {
        return Math.floor(Math.random() * 100) + 1;
    }

    let randNumber = "https://www.random.org/clients/http/api/" //genRandom();
    const $button =$("#valider");
    const $input = $("#input");
    const $showMessage = $("#message");

    const textSup = "C'est plus";
    const textInf = "C'est moin";
    const notInt = "On a dit un nombre entier!!!";
    let lost = "C'est perdu!, Le nombre Myst\xe8re \xe9tait ";
    let textCorrect = "C'est gang\xe9, le nomber mystere \xe9tait bien ";

    const resetGame = () => {
        $button.html('Essayer');
        randNumber = genRandom();
        console.log(randNumber);
        try_count = 0;
        lost  = "C'est perdu!, Le nombre Myst\xe8re \xe9tait " ;
        textCorrect = "C'est gang\xe9, le nomber mystere \xe9tait bien ";
    }

    const guess = () => {
        try_count++;
        const actual_Value = parseInt($input.val(), 10);
        const current_count = "[" + try_count + "] ";
        $button.attr('value','Essayer');
        destroyInnerText();

        if ($button.text() === 'Rejouer?') {
            $input.val('');
            resetGame();
            return;
        }
        if (actual_Value === randNumber) {
            $button.html('Rejouer?');
            $showMessage.text(current_count + textCorrect + randNumber) ;
            changeColor("correct");
        }
        else if (try_count === max_try) {
            $showMessage.text(lost + randNumber)
            changeColor("lost");
            resetGame();
        } else if (actual_Value > randNumber) {
            $showMessage.text(current_count + textSup)
            changeColor();
        } else if (actual_Value < randNumber) {
            $showMessage.text(current_count + textInf);
            changeColor();
        } else {
            $showMessage.text(current_count + notInt);
            changeColor("not integer");
        }
    }

    const destroyInnerText = () => {
       $showMessage.text('');
    }

    const changeColor = (current_state) => {
        switch (current_state) {
            case "correct":
                $showMessage.css('color',"green");
                break;
            case "lost":
                $showMessage.css('color',"red");
                break;
            case "not integer":
                $showMessage.css('color',"default");
                break;
            default:
                $showMessage.css('color',"blue");
                break;
        }
    }
    $button.on("click", guess);
    resetGame();
})

