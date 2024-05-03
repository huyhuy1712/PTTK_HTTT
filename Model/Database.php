 <?php
class MyConnection
{
    private $server, $username, $password, $database;
    private $connection;

    public function __construct($server, $username, $password, $database)
    {
        $this->server = $server;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
    }

    public function connectDB()
    {
        $this->connection = new mysqli($this->server, $this->username, $this->password, $this->database);
        if ($this->connection->connect_error) {
            die("Kết nối đến MySQL thất bại: " . $this->connection->connect_error);
        }

    }

    public function query($sql)
    {
        return $this->connection->query($sql);
    }

    public function closeConnection()
    {
        if ($this->connection) {
            $this->connection->close();
        }
    }

    public function create($tableName, $data)
    {
        $columns = implode(", ", array_keys($data));
        $values = "'" . implode("', '", array_values($data)) . "'";
        $sql = "INSERT INTO $tableName ($columns) VALUES ($values)";

        if ($this->connection->query($sql) === TRUE) {
            return true;
        } else {
            echo "Lỗi khi tạo dữ liệu: " . $this->connection->error;
            return false;
        }
    }

    public function read($tableName, $condition = "")
    {
        $sql = "SELECT * FROM $tableName";
        if (!empty($condition)) {
            $sql .= " WHERE $condition";
        }

        $result = $this->connection->query($sql);

        if ($result->num_rows > 0) {
            $data = [];
            while ($row = $result->fetch_assoc()) {
                $data[] = $row;
            }
            return $data;
        } else {
            return [];
        }
    }

    public function update($tableName, $id_name, $id, $data)
    {
        $set = [];
        foreach ($data as $column => $value) {
            $set[] = "$column = '$value'";
        }
        $set = implode(", ", $set);
        $sql = "UPDATE $tableName SET $set WHERE $id_name = $id";

        if ($this->connection->query($sql) === TRUE) {
            return true;
        } else {
            echo "Lỗi khi cập nhật dữ liệu: " . $this->connection->error;
            return false;
        }
    }

    public function delete($tableName, $id_name ,$id)
    {
        $sql = "DELETE FROM $tableName WHERE $id_name = $id";

        if ($this->connection->query($sql) === TRUE) {
            return true;
        } else {
            echo "Lỗi khi xóa dữ liệu: " . $this->connection->error;
            return false;
        }
    }
}
