import { Priority, usePriority } from "../../lib/priority";
import { Category, useCategory } from "../../lib/category";
import Layout from "../../components/layout/Layout";
import { Configuration } from "../../components/configuration/Configuration";
import { useState } from "react";
import { useAuth } from "../../lib/auth";
import { Alert } from "../../components/Alert";
import { SpinnerFullPage } from "../../components/Spinner";
import useDeleteCategory from "../../lib/hooks/category/useDeleteCategory";
import useDeletePriority from "../../lib/hooks/priority/useDeletePriority";

const ConfigurationPage = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [successMessage, setSuccessMessage] = useState<string | undefined>(
    undefined
  );
  const [categoryToBeRemoved, setCategoryToBeRemoved] = useState<
    Category | undefined
  >(undefined);
  const [priorityToBeRemoved, setPriorityToBeRemoved] = useState<
    Priority | undefined
  >(undefined);

  const { loading } = useAuth();
  const { priorities } = usePriority();
  const { categories } = useCategory();

  const { mutate: deleteCategoryMutation, isLoading: deleteCategoryLoading } =
    useDeleteCategory();

  const { mutate: deletePriorityMutation, isLoading: deletePriorityLoading } =
    useDeletePriority();

  const onRemoveCategoryHandler = async () => {
    if (categoryToBeRemoved) {
      deleteCategoryMutation(categoryToBeRemoved, {
        onSuccess: (status: number) => {
          if (status === 200) {
            setSuccessMessage("Your category was successfully removed.");
          }
        },
        onError: (error) => {
          setErrorMessage((error as Error).message);
        },
      });

      setCategoryToBeRemoved(undefined);
    }
  };

  const onRemovePriorityHandler = async () => {
    if (priorityToBeRemoved) {
      deletePriorityMutation(priorityToBeRemoved, {
        onSuccess: (status: number) => {
          if (status === 200) {
            setSuccessMessage("Your priority was successfully removed.");
          }
        },
        onError: (error) => {
          setErrorMessage((error as Error).message);
        },
      });

      setPriorityToBeRemoved(undefined);
    }
  };

  return (
    <Layout>
      <div className="absolute top-10 right-0">
        {categoryToBeRemoved && (
          <Alert
            type="confirm"
            text={`Remove the "${categoryToBeRemoved?.name}" category? All associated contacts will be removed.`}
            onClose={setCategoryToBeRemoved}
            onCancel={setCategoryToBeRemoved}
            onConfirm={onRemoveCategoryHandler}
          />
        )}

        {priorityToBeRemoved && (
          <Alert
            type="confirm"
            text={`Remove the "${priorityToBeRemoved?.name}" priority?`}
            onClose={setPriorityToBeRemoved}
            onCancel={setPriorityToBeRemoved}
            onConfirm={onRemovePriorityHandler}
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

      <Configuration
        categories={categories}
        priorities={priorities}
        onRemoveCategory={setCategoryToBeRemoved}
        onRemovePriority={setPriorityToBeRemoved}
      />

      {(loading || deleteCategoryLoading || deletePriorityLoading) && (
        <SpinnerFullPage />
      )}
    </Layout>
  );
};

export default ConfigurationPage;
