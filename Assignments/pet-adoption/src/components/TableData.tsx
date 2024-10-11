import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Label } from "@radix-ui/react-label";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomPagination } from "./Pagination";
import { useState } from "react";

interface Submission {
  petName: string;
  petType: string;
  breed: string;
  name: string;
  email: string;
  phone: string;
}

interface SubmissionsTableProps {
  submissions: Submission[];
}

export const TableData: React.FC<SubmissionsTableProps> = ({ submissions }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const paginatedSubmissions = submissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleClick = () => {
    navigate("/");
  };
  return (
    <div>
      <Label className="flex justify-center text-3xl font-bold mb-4">
        Pet Adoption Table
      </Label>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Pet Name</TableHead>
            <TableHead>Pet Type</TableHead>
            <TableHead className="text-center">Breed</TableHead>
            <TableHead>Adopter Name</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedSubmissions.map((submission, index) => (
            <TableRow className="text-center" key={index}>
              <TableCell>{submission.petName}</TableCell>
              <TableCell>{submission.petType}</TableCell>
              <TableCell>{submission.breed}</TableCell>
              <TableCell>{submission.name}</TableCell>
              <TableCell>{submission.email}</TableCell>
              <TableCell>{submission.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-2">
        <CustomPagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      <Button onClick={handleClick}>
        <ChevronLeft />
      </Button>
    </div>
  );
};
