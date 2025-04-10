// Generating token using sign
// Understanding verify and decode also
const jwt = require("jsonwebtoken")
const secret_key = "Main_nahi_batunga!"
const contents= {
    "name": "Rohan",
    "id": 12345678
}
const newToken = jwt.sign(contents, secret_key)
console.log(newToken);

const value= {
    "name": "Rohan",
    "id": 12345678
}

// Verifying token using verify
const verifiedValue=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9oYW4iLCJpZCI6MTIzNDU2NzgsImlhdCI6MTc0MjgwOTQ4M30.e7Bnm78xBLZZp17XEWmg6b1jvImaJdMTk1Uf9gRT3uk",secret_key);
console.log(verifiedValue);

// Using decode and correct secret key
const verifiedValue1=jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9oYW4iLCJpZCI6MTIzNDU2NzgsImlhdCI6MTc0MjgwOTQ4M30.e7Bnm78xBLZZp17XEWmg6b1jvImaJdMTk1Uf9gRT3uk",secret_key);
console.log(verifiedValue1);

// Using decode & different secret key
const verifiedValue2=jwt.decode("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9oYW4iLCJpZCI6MTIzNDU2NzgsImlhdCI6MTc0MjgwOTQ4M30.e7Bnm78xBLZZp17XEWmg6b1jvImaJdMTk1Uf9gRT3uk","asdfg");
console.log(verifiedValue2);

// Using verify but different secret key(will cause error)
const verifiedValue3=jwt.verify("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiUm9oYW4iLCJpZCI6MTIzNDU2NzgsImlhdCI6MTc0MjgwOTQ4M30.e7Bnm78xBLZZp17XEWmg6b1jvImaJdMTk1Uf9gRT3uk","asdfg");
console.log(verifiedValue3);

// See output. iat stands for "issued at". iat = token was issued at this exact date and time.




/*
Notes:
    - JWT token ek type k real world k bank ke cheque book jaisa hai ..like jaise hm bank mein account open krte hai toh hmlog ko ek cheque book milta hai return mei..
    - Hm apne cheque book ko kisi ko bhi dikha skte hai like uspe sign bhi jo krte hai woh bhi sbko dikha skte hai but koi agar us cheque book ko replicate kr de aur sign ko bhi kr de but phr bhi bank us person ko account ka access nhi deta 
    - JWT are like that only kyuki JWT token ko bhi ek doorse secret_key se generate krwa skte hai but woh same nhi hoga woh verify nhi hoga..bhale hi contents same return kr dega ekdm same to same ...but woh usko verify nhi krega server kyuki woh sme token nhi hoga kyuki secret_key alg use krke sign kiye hai isliye
    - Example:

         const jwt = require("jsonwebtoken")
        const secret_key = "Le_jan_le_secret_key"
        const contents= {
            "name": "Rohan",
            "id": 12345678
        }

        const newToken = jwt.sign(contents, secret_key)
        console.log(newToken);

    - Is code pe sab kuch same iske token se data ko decode krenge toh same content bhi ayega but woh verified nahi btayega kyuki secret key alag hai 
    - Whatever the token is present in jwt usko hmlg decode kr skte hai like bina secret_key diye bina but usko verify krne k liye sme secret_key ka jrurt hota hai
    - const decodedtoken = jwt.decode(token)    <---------- bina kisi secret k hi decode kr skte hai but sign aur verify ke liye dono k liye SECRET_KEY ka need hai..without it sign aur verify possible nahi hai
*/



