import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { Contact, useContact } from "../../../lib/contact";
import { Priority, usePriority } from "../../../lib/priority";
import { Category, useCategory } from "../../../lib/category";
import { ContactDetails } from "../../../components/contacts/ContactDetails";
import { Log, useLog } from "../../../lib/log";
import Router, { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ROUTE_HOME } from "../../../config";
import { supabase } from "../../../lib";
import {Alert} from "../../../components/Alert";

const ContactDetailsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [logToBeRemoved, setLogToBeRemoved] = useState<Log | undefined>(
    undefined
  );

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

  useEffect(() => {
    if (successMessage) {
      setIsLoading(true);
      Router.push(`${ROUTE_HOME}/${thisContact?.id}`);
      setIsLoading(false);
    }
  }, [successMessage]);

  const onRemoveLogHandler = async () => {
    if (logToBeRemoved) {
      setIsLoading(true);

      const { error, status } = await supabase
        .from("log")
        .delete()
        .eq("user_id", logToBeRemoved.user_id)
        .eq("id", logToBeRemoved?.id);

      setLogToBeRemoved(undefined);
      setIsLoading(false);

      if (error) {
        setErrorMessage(error.message);
      } else if (status === 200) {
        setSuccessMessage("Your log was successfully removed.");
      }
    }
  };

  return (
    thisContact && (
      <Layout>
        <div className="absolute top-10 right-0">
          {logToBeRemoved && (
              <Alert
                  type="confirm"
                  text={`Remove the log from ${new Date(logToBeRemoved.timestamp).toLocaleString()}?`}
                  onClose={setLogToBeRemoved}
                  onCancel={setLogToBeRemoved}
                  onConfirm={onRemoveLogHandler}
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
        </div>

        <ContactDetails
          category={thisContactCategory}
          contact={thisContact}
          logs={thisContactLogs}
          priority={thisContactPriority}
          onRemoveLog={setLogToBeRemoved}
        />

        {loading || isLoading && <SpinnerFullPage />}
      </Layout>
    )
  );
};

export default ContactDetailsPage;
