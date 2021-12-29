import { Contact } from "../../lib/contact";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { Priority } from "../../lib/priority";
import { Category } from "../../lib/category";
import { Log } from "../../lib/log";
import Link from "next/link";
import { ROUTE_HOME } from "../../config";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";
import { getNoOfHoursSinceDate } from "../../lib/utils";

const twFullConfig = resolveConfig(tailwindConfig);

interface ContactDetailsProps {
  contact: Contact;
  priority: Priority;
  category: Category;
  logs: Log[];
}

export const ContactDetails: React.FC<ContactDetailsProps> = ({
  contact,
  category,
  priority,
  logs,
}) => {
  const noOfHoursSinceLastLogEntry =
    logs && logs.length > 0
      ? getNoOfHoursSinceDate(new Date(logs[logs.length - 1].timestamp))
      : null;

  return (
    <>
      <div className="flex flex-col p-5">
        <div className="mb-2 flex items-center">
          <div className="font-bold text-xl mr-2">{contact.name}</div>
          {
            <FontAwesomeIcon
              icon={faCircle}
              color={
                noOfHoursSinceLastLogEntry &&
                noOfHoursSinceLastLogEntry < priority.frequency
                  ? twFullConfig.theme.colors.teal[500]
                  : noOfHoursSinceLastLogEntry &&
                    noOfHoursSinceLastLogEntry > priority.frequency
                  ? twFullConfig.theme.colors.rose[500]
                  : "gray"
              }
            />
          }
        </div>
        <Link href={`${ROUTE_HOME}/${contact.id}/newLog`}>
          <div className="my-5 flex">
            <button
              type="button"
              className="text-sm bg-slate-500 hover:bg-slate-600 border border-slate-500 hover:border-transparent text-white font-bold py-3 px-4 rounded text-center shadow"
            >
              Got in touch?
            </button>
          </div>
        </Link>

        <Link href={`${ROUTE_HOME}/${contact.id}/edit`}>
          <div className="my-5 flex">
            <button
                type="button"
                className="text-sm bg-slate-500 hover:bg-slate-600 border border-slate-500 hover:border-transparent text-white font-bold py-3 px-4 rounded text-center shadow"
            >
              Edit Contact
            </button>
          </div>
        </Link>

        <div>
          <p>{`Category: ${category.name}`}</p>
          <p>{`Relationship: ${contact.relationship}`}</p>
          <p>{`Priority: ${priority.name}`}</p>
          <div>
            Logs:
            {logs && logs.length > 0 ? (
              <div className="flex flex-col">
                {logs.map((log, index) => (
                  <div key={log.id}>
                    <div className="ml-5">{`Log ${index + 1}`}</div>
                    <div className="ml-10">{`Date: ${new Date(
                      log.timestamp
                    ).toLocaleString()}`}</div>
                    <div className="ml-10">{`Note: ${log.note}`}</div>
                  </div>
                ))}
              </div>
            ) : (
              " There are no logs"
            )}
          </div>
        </div>
      </div>
    </>
  );
};
