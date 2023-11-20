
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
export const formatDate = (d) => {
    if (!d) {
        return "";
    }
    return dayjs(d).format("ll");
};