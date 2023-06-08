package fd.adse.account.utils;

import org.hibernate.dialect.MySQL57Dialect;
//import org.hibernate.dialect.MySQL57InnoDBDialect;

public class DefaultMySQL57Dialect extends MySQL57Dialect {
    @Override
    public String getTableTypeString() {
        return " ENGINE=InnoDB DEFAULT CHARSET=utf8";
    }
}
