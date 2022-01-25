import { useAuth } from "../../lib/auth";
import { SpinnerFullPage } from "../../components/Spinner";
import Layout from "../../components/layout/Layout";
import { ManageCategoryForm } from "../../components/categories/ManageCategoryForm";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import { Category } from "../../lib/category";
import Router from "next/router";
import { ROUTE_CONFIGURATION } from "../../config";
import useCreateCategory from "../../lib/hooks/category/useCreateCategory";

const NewCategoryPage = () => {
  const { user, loading } = useAuth();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string>();

  const { mutate, isLoading } = useCreateCategory();

  const onSubmit = async (category: Category) => {
    if (user) {
      mutate(
        {
          name: category.name,
          user_id: user.id,
        },
        {
          onSuccess: (status: number) => {
            if (status === 201) {
              setSuccessMessage("Your new category was successfully saved.");
              Router.push(ROUTE_CONFIGURATION);
              setSuccessMessage(undefined);
            }
          },
          onError: (error) => {
            setErrorMessage((error as Error).message);
          },
        }
      );
    } else throw new Error("User is not authenticated");
  };

  const onCancel = () => {};

  return (
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

      <ManageCategoryForm onSubmit={onSubmit} onCancel={onCancel} />

      {(loading || isLoading) && <SpinnerFullPage />}
    </Layout>
  );
};

export default NewCategoryPage;
