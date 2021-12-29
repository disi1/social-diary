import { useAuth } from "../../../lib/auth";
import { SpinnerFullPage } from "../../../components/Spinner";
import Layout from "../../../components/layout/Layout";
import { Contact, useContact } from "../../../lib/contact";
import { Priority, usePriority } from "../../../lib/priority";
import { Category, useCategory } from "../../../lib/category";
import { ContactDetails } from "../../../components/contacts/ContactDetails";
import { Log, useLog } from "../../../lib/log";
import { useRouter } from "next/router";

const ContactDetailsPage = () => {
  const { loading } = useAuth();

  if (loading) {
    return <SpinnerFullPage />;
  }

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

  return (
    thisContact && (
      <Layout>
        <ContactDetails
          category={thisContactCategory}
          contact={thisContact}
          logs={thisContactLogs}
          priority={thisContactPriority}
        />
      </Layout>
    )
  );
};

export default ContactDetailsPage;
