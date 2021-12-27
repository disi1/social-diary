import { useCategory } from "../../lib/category";
import Layout from "../../components/layout/Layout";
import { ContactList } from "../../components/contacts/ContactList";
import { useContact } from "../../lib/contact";
import { useLog } from "../../lib/log";

const ContactsPage = () => {
  const { categories } = useCategory();
  const { contacts } = useContact();
  const { logs } = useLog();

  return (
    <Layout>
      <ContactList categories={categories} contacts={contacts} logs={logs} />
    </Layout>
  );
};

export default ContactsPage;
