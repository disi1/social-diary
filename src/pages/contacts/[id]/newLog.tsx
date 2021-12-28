import { useState } from "react";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import { Alert } from "../../../components/Alert";
import Layout from "../../../components/layout/Layout";
import { Contact } from "../../../lib/contact";
import { supabase } from "../../../lib";
import { Log } from "../../../lib/log";
import { NewLogForm } from "../../../components/logs/NewLogForm";
import { GetServerSideProps, NextPage } from "next";
import { ROUTE_AUTH } from "../../../config";

interface NewLogPageProps {
  contacts: Contact[];
}

const NewLogPage: NextPage<NewLogPageProps> = ({ contacts }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { user, loading } = useAuth();
  if (loading || isLoading) {
    return <SpinnerFullPage />;
  }

  const onSubmit = async (log: Log) => {
    setIsLoading(true);

    const { error, status } = await supabase.from("log").insert([
      {
        contact_id: log.contact_id,
        note: log.note,
        timestamp: log.timestamp,
        user_id: log.user_id,
      },
    ]);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 201) {
      setSuccessMessage("Your new Log was successfully saved.");
    }
  };

  const onCancel = () => {};

  return (
    <Layout>
      {errorMessage && (
        <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
      )}
      {successMessage && (
        <Alert type="success" text={successMessage} onClose={setErrorMessage} />
      )}

      <NewLogForm
        contact={contacts[0]}
        onSubmit={onSubmit}
        onCancel={onCancel}
      />
    </Layout>
  );
};

export default NewLogPage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    const { user } = await supabase.auth.api.getUserByCookie(context.req);

    if (!user) {
      return {
        redirect: {
          destination: ROUTE_AUTH,
          permanent: false,
        },
      };
    } else {
      supabase.auth.setAuth(context.req.cookies["sb:token"]);

      const { data: contacts } = await supabase
        .from("contact")
        .select("*")
        .eq("user_id", user.id)
        .eq("id", context.params?.id);

      return {
        props: {
          contacts: contacts as Contact[],
        },
      };
    }
  } catch (err) {
    return {
      props: {},
    };
  }
};
