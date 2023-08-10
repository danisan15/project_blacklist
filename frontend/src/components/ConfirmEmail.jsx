import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

export default function ConfirmEmail() {
  const { token } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const confirmEmail = async () => {
      const client = createClient(
        import.meta.env.VITE_SUPABASE_URL,
        import.meta.env.VITE_SUPABASE_KEY
      );
      try {
        const { error } = await client.auth.api.updateUser({
          data: { email_confirmed: true },
          accessToken: token,
        });
        if (error) {
          console.error("Confirmacion fallida!:", error.message);
        } else {
          console.log("Email confirmado!");
        }
      } catch (error) {
        console.error("Ocurrio un error:", error);
      }
      navigate("/"); // Redirect to the desired page after confirmation
    };

    confirmEmail();
  }, [token, navigate]);

  return <div>Confirming email...</div>;
}
