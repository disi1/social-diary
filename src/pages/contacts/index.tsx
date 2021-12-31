import { useCategory } from "../../lib/category";
import Layout from "../../components/layout/Layout";
import { ContactList } from "../../components/contacts/ContactList";
import { useContact } from "../../lib/contact";
import {Log, useLog} from "../../lib/log";
import {usePriority} from "../../lib/priority";

const ContactsPage = () => {
  const { priorities } = usePriority();
  const { categories } = useCategory();
  const { contacts } = useContact();
  const { logs } = useLog();

  return (
    <Layout>
      <ContactList categories={categories} contacts={contacts} logs={logs} priorities={priorities} />
    </Layout>
  );
};

export default ContactsPage;
