import { useState } from "react";
import { useAuth } from "../../../../lib/auth";
import { Log, useLog } from "../../../../lib/log";
import Router, { useRouter } from "next/router";
import Layout from "../../../../components/layout/Layout";
import { Alert } from "../../../../components/Alert";
import { SpinnerFullPage } from "../../../../components/Spinner";
import { ManageLogForm } from "../../../../components/logs/ManageLogForm";
import { Contact, useContact } from "../../../../lib/contact";
import { ROUTE_HOME } from "../../../../config";
import useUpdateLog from "../../../../lib/hooks/log/useUpdateLog";

const EditLogPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { loading } = useAuth();
  const { logs } = useLog();
  const { contacts } = useContact();

  const { id, logId } = useRouter().query;

  const currentLog =
    logId && typeof logId === "string"
      ? (logs?.find((log) => log.id === parseInt(logId)) as Log)
      : null;

  const currentContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

  const { mutate, isLoading } = useUpdateLog();

  const onSubmit = async (log: Log) => {
    if (currentLog) {
      mutate(
        {
          id: currentLog.id,
          user_id: log.user_id,
          contact_id: log.contact_id,
          note: log.note,
          timestamp: log.timestamp,
        },
        {
          onSuccess: (status: number) => {
            if (status === 200) {
              setSuccessMessage("Your log was successfully updated.");
              Router.push(`${ROUTE_HOME}/${id}`);
              setSuccessMessage(undefined);
            }
          },
          onError: (error) => {
            setErrorMessage((error as Error).message);
          },
        }
      );
    }
  };

  const onCancel = () => {};

  return (
    currentLog &&
    currentContact && (
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

        <ManageLogForm
          contact={currentContact}
          log={currentLog}
          onSubmit={onSubmit}
          onCancel={onCancel}
        />

        {(loading || isLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default EditLogPage;
