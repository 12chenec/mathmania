import React from 'react';

export function generateProblem(maxDigits, operations) {
    const operators = [];
    if (operations.addition) operators.push('+');
    if (operations.subtraction) operators.push('-');
    if (operations.multiplication) operators.push('*');
    if (operations.multiplication) operators.push('/');

    const maxNum = Math.pow(10, maxDigits) - 1;
    const operator = operators[Math.floor(Math.random() * operators.length)];
    const num1 = Math.floor(Math.random() * maxNum) + 1;
    const num2 = Math.floor(Math.random() * maxNum) + 1;


    let q;
    let a;

    if (operator === '/') {
        let divisor, dividend;
        do {
            divisor = Math.floor(Math.random() * maxNum) + 1;
            dividend = divisor * (Math.floor(Math.random() * maxNum) + 1);
        } while (dividend > maxNum || divisor > maxNum);
        q = `${dividend} ${operator} ${divisor}`;
        a = dividend / divisor;
    } else {
        q = `${num1} ${operator} ${num2}`;
        a = eval(q);
    }

    return {q, a};
}