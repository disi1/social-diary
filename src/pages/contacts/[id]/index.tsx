import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { Contact, useContact } from "../../../lib/contact";
import { Priority, usePriority } from "../../../lib/priority";
import { Category, useCategory } from "../../../lib/category";
import { ContactDetails } from "../../../components/contacts/ContactDetails";
import { Log, useLog } from "../../../lib/log";
import Router, { useRouter } from "next/router";
import { useState } from "react";
import { ROUTE_HOME } from "../../../config";
import { Alert } from "../../../components/Alert";
import useDeleteLog from "../../../lib/hooks/log/useDeleteLog";
import useDeleteContact from "../../../lib/hooks/contact/useDeleteContact";

const ContactDetailsPage = () => {
  const [isLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [contactRemovedSuccessMessage, setContactRemovedSuccessMessage] =
    useState<string>();
  const [logToBeRemoved, setLogToBeRemoved] = useState<Log | undefined>(
    undefined
  );
  const [contactToBeRemoved, setContactToBeRemoved] = useState<
    Contact | undefined
  >(undefined);

  const { loading } = useAuth();
  const { contacts } = useContact();

  const { id } = useRouter().query;
  const thisContact =
    id && typeof id === "string"
      ? (contacts?.find((contact) => contact.id === parseInt(id)) as Contact)
      : null;

  const { categories } = useCategory();
  const { priorities } = usePriority();
  const { logs } = useLog();

  const thisContactCategory = categories?.find(
    (category) => category.id === thisContact?.category_id
  ) as Category;

  const thisContactPriority = priorities?.find(
    (priority) => priority.id === thisContact?.priority_id
  ) as Priority;

  const thisContactLogs = logs?.filter(
    (log) => log.contact_id === thisContact?.id
  ) as Log[];
  thisContactLogs.sort(
    (a, b) => new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
  );

  const { mutate: deleteLogMutation, isLoading: deleteLogIsLoading } =
    useDeleteLog();
  const { mutate: deleteContactMutation, isLoading: deleteContactIsLoading } =
    useDeleteContact();

  const onRemoveLogHandler = async () => {
    if (logToBeRemoved) {
      deleteLogMutation(logToBeRemoved, {
        onSuccess: (status: number) => {
          if (status === 200) {
            setSuccessMessage("Your log was successfully removed.");
          }
        },
        onError: (error) => {
          setErrorMessage((error as Error).message);
        },
      });

      setLogToBeRemoved(undefined);
    }
  };

  const onRemoveContactHandler = async () => {
    if (contactToBeRemoved) {
      deleteContactMutation(contactToBeRemoved, {
        onSuccess: (status: number) => {
          if (status === 200) {
            setContactRemovedSuccessMessage(
              "Your contact and associated logs were successfully removed."
            );
            Router.push(ROUTE_HOME);
            setContactRemovedSuccessMessage(undefined);
          }
        },
        onError: (error) => {
          setErrorMessage((error as Error).message);
        },
      });

      setContactToBeRemoved(undefined);
    }
  };

  return (
    thisContact && (
      <Layout>
        <div className="absolute top-10 right-0">
          {logToBeRemoved && (
            <Alert
              type="confirm"
              text={`Remove the log from ${new Date(
                logToBeRemoved.timestamp
              ).toLocaleString()}?`}
              onClose={setLogToBeRemoved}
              onCancel={setLogToBeRemoved}
              onConfirm={onRemoveLogHandler}
            />
          )}

          {contactToBeRemoved && (
            <Alert
              type="confirm"
              text={`Remove ${thisContact.name} contact? All associated logs will be removed.`}
              onClose={setContactToBeRemoved}
              onCancel={setContactToBeRemoved}
              onConfirm={onRemoveContactHandler}
            />
          )}

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

          {contactRemovedSuccessMessage && (
            <Alert
              type="success"
              text={contactRemovedSuccessMessage}
              onClose={setContactRemovedSuccessMessage}
            />
          )}
        </div>

        <ContactDetails
          category={thisContactCategory}
          contact={thisContact}
          logs={thisContactLogs}
          priority={thisContactPriority}
          onRemoveContact={() => setContactToBeRemoved(thisContact)}
          onRemoveLog={setLogToBeRemoved}
        />

        {(loading || isLoading || deleteLogIsLoading) && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default ContactDetailsPage;
