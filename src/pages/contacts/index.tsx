import Link from "next/link";
import { SpinnerFullPage } from "../../components/Spinner";
import { useAuth } from "../../lib/auth";
import { useCategory } from "../../lib/category";
import Layout from "../../components/layout/Layout";
import {ContactList} from "../../components/contacts/ContactList";

const ContactsPage = () => {
  const {
    user, // The logged-in user object
    loading, // loading state
  } = useAuth();

  const {
    categories
  } = useCategory();

  if (loading) {
    return <SpinnerFullPage />;
  }

  return (
    <>
      {!user && (
        <div className="h-screen flex flex-col justify-center items-center relative">
          <h2 className="text-3xl my-4">
            Howdie, Explorer!
          </h2>
          <small className="mb-2">
            You&apos;ve landed on a protected page. Please{" "}
            <Link href="/">log in</Link> to view the page&apos;s full content{" "}
          </small>
        </div>
      )}
      {user && (
        <Layout>
            <ContactList categories={categories}/>
        </Layout>
      )}
    </>
  );
};

export default ContactsPage;
