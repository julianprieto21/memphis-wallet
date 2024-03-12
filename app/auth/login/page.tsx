import Separator from "../../components/HLine";
import LoginForm from "../../components/login/LoginForm";

export default function LoginPage() {
  return (
    <section className="bg-neutral-200 sm:w-[80%] h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </section>
  );
}
