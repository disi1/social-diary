import { useState } from "react";
import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import { Alert } from "../../../components/Alert";
import Layout from "../../../components/layout/Layout";
import { Contact, useContact } from "../../../lib/contact";
import { supabase } from "../../../lib";
import { Log } from "../../../lib/log";
import { NewLogForm } from "../../../components/logs/NewLogForm";
import { useRouter } from "next/router";

const NewLogPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { loading } = useAuth();
  if (loading || isLoading) {
    return <SpinnerFullPage />;
  }

  const { contacts } = useContact();

  const { id } = useRouter().query;
  const thisContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

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
    thisContact && (
      <Layout>
        {errorMessage && (
          <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
        )}
        {successMessage && (
          <Alert
            type="success"
            text={successMessage}
            onClose={setSuccessMessage}
          />
        )}

        <NewLogForm
          contact={thisContact}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />
      </Layout>
    )
  );
};

export default NewLogPage;
