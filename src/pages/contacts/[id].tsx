import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { ContactDetails } from "../../components/contacts/ContactDetails";
import {Contact, useContact} from "../../lib/contact";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps } from "next";
import {supabase} from "../../lib";

const ContactDetailsPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <SpinnerFullPage />;
  }

  const router = useRouter();
  const contactId = router.query.id;

  // send a request to the backend API
  // to fetch the contact item with the id

  return (
    <>
      {!user && (
        <div className="h-screen flex flex-col justify-center items-center relative">
          <h2 className="text-3xl my-4">Howdie, Explorer!</h2>
          <small className="mb-2">
            You&apos;ve landed on a protected page. Please{" "}
            <Link href="/">log in</Link> to view the page&apos;s full content{" "}
          </small>
        </div>
      )}

      {user && <Layout>BLA</Layout>}
    </>
  );
};

export default ContactDetailsPage;
