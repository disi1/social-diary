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
      <div className="flex cursor-pointer">
        <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden bg-gray-300" />
        <div className="w-full border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <div className="items-center mb-8">
            <div className="mb-2 flex items-center">
              <div className="text-gray-700 font-bold text-xl mr-2">
                {contact.name}
              </div>
              {
                <FontAwesomeIcon
                  icon={faCircle}
                  color={
                    priority &&
                    noOfHoursSinceLastLogEntry &&
                    noOfHoursSinceLastLogEntry < priority.frequency
                      ? twFullConfig.theme.colors.teal[500]
                      : priority &&
                        noOfHoursSinceLastLogEntry &&
                        noOfHoursSinceLastLogEntry > priority.frequency
                      ? twFullConfig.theme.colors.red[500]
                      : "gray"
                  }
                />
              }
            </div>
            <p className="text-gray-700 text-base">{contact.relationship}</p>
          </div>
          <div className="flex items-center">
            <FontAwesomeIcon
              icon={faCalendar}
              color={"gray"}
              className="mr-2"
            />
            <div className="text-sm">
              <p className="text-gray-600">
                {logs && logs.length > 1 ? logs[logs?.length] : "No logs"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
