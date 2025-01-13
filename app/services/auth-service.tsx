interface RegisterUserProps {
    username: string;
    password: string;
    email: string;
}

// interface LoginUserProps {
//   identifier: string;
//   password: string;
// }

export async function registerUserService(userData: RegisterUserProps) {

    try {
        const options = { method: "POST", body: JSON.stringify({ ...userData }), }
        const res = await fetch('http://localhost:3000/api/signup1', options);
        return res.json();
        
        // const resdata = await res.json();
        // console.log(resdata)

        // const response = await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify({ ...userData }),
        // });
        // return response.json();

    } catch (error) {
        console.error("Registration Service Error:", error);
    }
}

// export async function loginUserService(userData: LoginUserProps) {
//   const url = new URL("/api/auth/local", baseUrl);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ ...userData }),
//     });

//     return response.json();
//   } catch (error) {
//     console.error("Login Service Error:", error);
//     throw error;
//   }
// }