import Table from "react-bootstrap/Table";

const About = () => {
  return (
    <Table striped bordered hover variant="dark" style={{ marginTop: "150px" }}>
      <thead>
        <tr>
          <th className="text-center">No</th>
          <th className="text-center">Kode Peserta</th>
          <th className="text-center">Nama Kelompok 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="text-center">1</td>
          <td className="text-center">RCTN-KS05-010</td>
          <td>MUHAMMAD ANWAR FIRDAUS (Leader)</td>
        </tr>
        <tr>
          <td className="text-center">2</td>
          <td className="text-center">RCTN-KS05-007</td>
          <td>ARIZFI AGUSTIN</td>
        </tr>
        <tr>
          <td className="text-center">3</td>
          <td className="text-center">RCTN-KS05-008</td>
          <td>AHMAD SAIFULLAH</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default About;
