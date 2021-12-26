import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Link from "next/link";
import Layout from "../../components/layout/Layout";
import { NewCategoryForm } from "../../components/categories/NewCategoryForm";
import { useState } from "react";
import { supabase } from "../../lib";
import { Alert } from "../../components/Alert";
import { Category } from "../../lib/category";

const NewCategoryPage = () => {
  const { user, loading } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  if (loading || isLoading) {
    return <SpinnerFullPage />;
  }

  const onSubmit = async (category: Category) => {
    setIsLoading(true);

    const { error, status, statusText } = await supabase
      .from("category")
      .insert([{ name: category.name, user_id: user?.id }]);

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
    } else if (status === 201) {
      setSuccessMessage("Your new category was successfully saved.");
    }
  };

  const onCancel = () => {};

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
      {user && (
        <Layout>
          {errorMessage && <Alert type="error" text={errorMessage} onClose={setErrorMessage}/>}
          {successMessage && <Alert type="success" text={successMessage} onClose={setErrorMessage}/>}
          <NewCategoryForm onSubmit={onSubmit} onCancel={onCancel} />
        </Layout>
      )}
    </>
  );
};

export default NewCategoryPage;
