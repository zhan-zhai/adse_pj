package fd.adse.notification.utils;

import org.hibernate.dialect.MySQL57Dialect;

public class DefaultMySQL57Dialect extends MySQL57Dialect {
    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
