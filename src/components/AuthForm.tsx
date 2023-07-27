import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { authService } from "../firebase";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState("");

  const onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { name, value }: { name: string; value: string } = e.currentTarget;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      let data;

      if (newAccount) {
        // create account
        data = await createUserWithEmailAndPassword(
          authService,
          email,
          password
        );
      } else {
        // log in
        data = await signInWithEmailAndPassword(authService, email, password);
      }

      console.log(data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error.message);
    }
  };

  const toggleAccount = () => {
    setNewAccount((pre) => !pre);
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={onChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={onChange}
          required
        />
        <button>{newAccount ? "가입하기" : "로그인하기"}</button>
        {error}
      </form>
      <button onClick={toggleAccount}>
        {newAccount ? "로그인 할래요" : "새로 가입 할래요"}
      </button>
    </>
  );
}