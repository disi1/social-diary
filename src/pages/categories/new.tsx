import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
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

    const { error, status } = await supabase
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
    <Layout>
      {errorMessage && (
        <Alert type="error" text={errorMessage} onClose={setErrorMessage} />
      )}
      {successMessage && (
        <Alert type="success" text={successMessage} onClose={setSuccessMessage} />
      )}

      <NewCategoryForm onSubmit={onSubmit} onCancel={onCancel} />
    </Layout>
  );
};

export default NewCategoryPage;
