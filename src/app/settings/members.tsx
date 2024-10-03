"use client";

import React, { useEffect, useState, useContext } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { WorkspaceDataContext } from "@/components/ClientComponents/workspace-provider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import AddUserForm from "./addUsers";
import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

function Members() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { curWorkspace } = useContext(WorkspaceDataContext);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 15;

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace_users/${curWorkspace.id}/list`);
                if (!response.ok) {
                    throw new Error("Failed to fetch users");
                }

                const data = await response.json();

                const filteredUsers = data.filter((user) => user.workspace_id === curWorkspace.id).map((user) => user.user);
                setUsers(filteredUsers);
            } catch (error) {
                setError("Failed to load members");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [curWorkspace]);

    const onSubmit = async (data: any) => {
        if (data.password !== data.confirm_password) {
            setError("Passwords don't match!");
            return;
        }

        error && setError(null);

        const formData = {
            email: data.email,
            password: data.password,
        };

        try {
            // Step 1: Create a new user
            const userResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!userResponse.ok) {
                throw new Error("Failed to create user");
            }

            const user = await userResponse.json();

            // Step 2: Add user to the current workspace
            const workspaceUserResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/workspace_users/`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user_id: user.id,
                    workspace_id: curWorkspace.id,
                }),
            });

            if (!workspaceUserResponse.ok) {
                throw new Error("Failed to add user to workspace");
            }

            // Refresh the user list after adding the new user
            setUsers((prev) => [...prev, user]);
            setIsDialogOpen(false);
        } catch (error) {
            console.error(error);
            setError("Failed to add user");
        }
    };

    // Filter users based on the search query
    const filteredUsers = users.filter(
        (user) => user.email && user.email.toLowerCase().includes(searchQuery.toLowerCase()) // Ensure user.name exists
    );

    // Pagination logic based on filtered users
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const currentUsers = filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage);

    const hasUsers = filteredUsers.length > 0; // Check if there are filtered users

    return (
        <div className="w-full p-10 ">
            <Table className=" rounded-md">
                <TableHeader>
                    <TableRow>
                        <TableHead colSpan={2}>
                            <div>
                                <p className="pb-1">Workspace Name</p>
                                <p className="pb-1">{curWorkspace.name}</p>
                            </div>
                        </TableHead>
                        <TableHead className="align-right text-right">
                            <Button className="px-5" onClick={() => setIsDialogOpen(true)}>
                                Add User
                            </Button>
                        </TableHead>
                    </TableRow>
                    <TableRow>
                        <TableHead colSpan={4} className="relative">
                            <div className="relative flex items-center w-full">
                                <input
                                    type="text"
                                    placeholder={`${users.length} User(s) found`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="py-2  px-1 w-full h-full pr-10"
                                />
                                <MagnifyingGlassIcon className="absolute right-3 h-4 w-4 text-gray-500" aria-hidden="true" />
                            </div>
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {loading ? (
                        <TableRow>
                            <TableCell colSpan={2}>Loading members...</TableCell>
                        </TableRow>
                    ) : error ? (
                        <TableRow>
                            <TableCell colSpan={2}>{error}</TableCell>
                        </TableRow>
                    ) : currentUsers.length > 0 ? (
                        currentUsers.map((user, index) => (
                            <TableRow key={index}>
                                <TableCell>{user.email}</TableCell>
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={2}>No members found</TableCell>
                        </TableRow>
                    )}

                    {/* Pagination component */}
                    <TableRow className="align-right text-right">
                        <TableCell colSpan={4}>
                            <Pagination>
                                <PaginationPrevious
                                    onClick={() => {
                                        if (currentPage > 1 && hasUsers) {
                                            setCurrentPage(currentPage - 1);
                                        }
                                    }}
                                    disabled={currentPage === 1 || !hasUsers} // Disable if first page or no users
                                />

                                <PaginationContent>
                                    {Array.from({ length: totalPages }, (_, index) => {
                                        const page = index + 1;
                                        return (
                                            <PaginationItem key={page}>
                                                <PaginationLink
                                                    isActive={currentPage === page}
                                                    onClick={() => {
                                                        if (hasUsers) {
                                                            setCurrentPage(page);
                                                        }
                                                    }}
                                                >
                                                    {page}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    })}
                                </PaginationContent>

                                <PaginationNext
                                    onClick={() => {
                                        if (currentPage < totalPages && hasUsers) {
                                            setCurrentPage(currentPage + 1);
                                        }
                                    }}
                                    disabled={currentPage === totalPages || !hasUsers} // Disable if last page or no users
                                />
                            </Pagination>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>

            {/* Dialog for adding a user */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add New User</DialogTitle>
                        <DialogDescription>Fill in the details to add a new user to the workspace.</DialogDescription>
                    </DialogHeader>

                    <AddUserForm
                        submitForm={onSubmit} // Pass the form submission handler
                        title="Add New User"
                        formError={error} // Pass any form error to the form
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default Members;
