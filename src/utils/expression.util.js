export function ResolveExpression(ENV, formula) {
    // let formula = '$RANK_TOTAL$+(($TOURNAMENT[max_size]$-1)*$RANK_REWARD{Per Kill}$)';
    let formula1 = formula;

    // const ENV = {
    //     '$RANK_TOTAL$': "19",
    //     '$TOURNAMENT': {
    //         max_size: 10
    //     },
    //     '$RANK_REWARD': [
    //         { key: "Per Kill", value: 10 }
    //     ]
    // }
    console.log("formula1", formula1)

    let tempExpression = "";

    for (let i = 0; i < formula.length; i++) {
        const char = formula[i];

        if (char == "$" && tempExpression === "") {
            tempExpression += char;
        } else if (char !== "$" && tempExpression !== "") {
            tempExpression += char;
        } else if (char === "$" && tempExpression !== "") {



            if (tempExpression.includes("[")) {
                let [variable, expression] = tempExpression.split("[");
                expression = expression.split("]")[0];

                const value = ENV[variable][expression];

                formula1 = formula1.replace(tempExpression, value);

                //dot operation
            } else if (tempExpression.includes("{")) {
                let [variable, expression] = tempExpression.split("{");
                expression = expression.split("}")[0];

                const value = ENV[variable];
                let realValue;
                value.forEach((item) => {
                    console.log('expression', expression, item)
                    if (expression == item.key) {
                        realValue = item.value;
                    }
                })

                console.log("realValue", realValue)

                formula1 = formula1.replace(tempExpression, realValue);
                //search operation
            } else {
                //direct replace
                tempExpression += char;
                formula1 = formula1.replace(tempExpression, ENV[tempExpression]);
            }

            tempExpression = "";
        }
    }

    formula1 = formula1.replace("$", "").replace("$", "");

    console.log("formula1", formula1)

    return eval(formula1);
}