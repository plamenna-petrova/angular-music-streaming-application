export const generateToken = () =>  {
    let charsForTokenConstruction = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
    let tokenArray = [];
    for (let i: number = 0; i < 32; i++) {
        let randomCharacterIndex: number = (Math.random() * (charsForTokenConstruction.length - 1)).toFixed(0) as unknown as number;
        tokenArray[i] = charsForTokenConstruction[randomCharacterIndex];
    }
    return tokenArray.join("");
}