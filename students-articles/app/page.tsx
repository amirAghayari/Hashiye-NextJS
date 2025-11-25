import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const Home = async () => {
  const cookieStore = await cookies();
  const user = cookieStore.get("user"); // یا مثلاً "token"


  if (user) {
    redirect("/dashboard");
  } else {
    redirect("/auth/login");
  }

  return null;
}

export default Home;