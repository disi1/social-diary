import { faCalendar, faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Contact } from "../../lib/contact";
import { Log } from "../../lib/log";
import Link from "next/link";
import { ROUTE_HOME } from "../../config";
import { getNoOfHoursSinceDate } from "../../lib/utils";
import { Priority } from "../../lib/priority";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../tailwind.config.js";

const twFullConfig = resolveConfig(tailwindConfig);

interface ContactItempProps {
  contact: Contact;
  priority: Priority | undefined;
  logs: Log[] | undefined;
}

export const ContactItem: React.FC<ContactItempProps> = ({
  contact,
  logs,
  priority,
}) => {
  const noOfHoursSinceLastLogEntry =
    logs && logs.length > 0
      ? getNoOfHoursSinceDate(new Date(logs[logs.length - 1].timestamp))
      : null;

  return (
    <Link href={`${ROUTE_HOME}/${contact.id}`}>
      <div className="card card-compact lg:card-side card-bordered cursor-pointer bg-white dark:bg-transparent">
        <div className="card-body">
          <h2 className="card-title text-gray-900 tracking-tight dark:text-gray-200">
            {contact.name}
            <FontAwesomeIcon
              className="ml-2"
              icon={faCircle}
              color={
                priority &&
                noOfHoursSinceLastLogEntry &&
                noOfHoursSinceLastLogEntry < priority.frequency
                  ? twFullConfig.theme.colors.teal[500]
                  : priority &&
                    noOfHoursSinceLastLogEntry &&
                    noOfHoursSinceLastLogEntry > priority.frequency
                  ? twFullConfig.theme.colors.rose[500]
                  : "gray"
              }
            />
          </h2>
          <p className="text-gray-900 tracking-tight dark:text-gray-200">{contact.relationship}</p>

          <div className="flex items-center mt-3">
            <FontAwesomeIcon
              icon={faCalendar}
              color={"gray"}
              className="mr-2 text-sky-400/30"
            />
            <div className="text-sm text-gray-900 tracking-tight dark:text-gray-200">
              <p>
                {logs && logs.length > 0
                  ? new Date(logs[logs?.length - 1].timestamp).toLocaleString()
                  : "No logs"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
