"use client";

import BreadcrumbPages from "@/components/BreadcrumbPages";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import MainHeader from "@/components/MainHeader";
import { ContentLayout } from "@/components/staff-panel/content-layout";
import { AuditTable } from "@/features/audit/components/AuditTable";
import { Pagination } from "@/features/audit/components/Pagination";
import { SearchInput } from "@/features/audit/components/SearchInput";
import { mockAuditLogs } from "@/features/audit/data/mock-data";
import { AuditLog } from "@/features/audit/types/audit-types";
import { useState, useEffect } from "react";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filteredLogs, setFilteredLogs] = useState<AuditLog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const logsPerPage = 10;

  useEffect(() => {
    fetchAuditLogs();
  }, []);

  const fetchAuditLogs = async () => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // const data = await auditApi.getAll({ page: currentPage, limit: logsPerPage })
      // setLogs(data)

      // Using mock data for now
      setTimeout(() => {
        setLogs(mockAuditLogs);
        setFilteredLogs(mockAuditLogs);
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Failed to fetch audit logs:", error);
      setIsLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    let filtered = logs.filter(
      (log) =>
        log.userName.toLowerCase().includes(query.toLowerCase()) ||
        log.action.toLowerCase().includes(query.toLowerCase()) ||
        log.resource.toLowerCase().includes(query.toLowerCase()) ||
        log.details?.toLowerCase().includes(query.toLowerCase())
    );

    if (selectedAction !== "all") {
      filtered = filtered.filter((log) => log.action === selectedAction);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleActionFilter = (action: string) => {
    setSelectedAction(action);
    let filtered = logs;

    if (action !== "all") {
      filtered = logs.filter((log) => log.action === action);
    }

    setFilteredLogs(filtered);
    setCurrentPage(1);
  };

  const handleExport = async () => {
    try {
      // TODO: Call export API
      // const data = await auditApi.export()
      console.log("[v0] Exporting audit logs to CSV");
      alert("Export functionality will be implemented by backend");
    } catch (error) {
      console.error("Failed to export audit logs:", error);
    }
  };

  const totalPages = Math.ceil(filteredLogs.length / logsPerPage);
  const paginatedLogs = filteredLogs.slice(
    (currentPage - 1) * logsPerPage,
    currentPage * logsPerPage
  );

  const actions = [
    "all",
    ...Array.from(new Set(logs.map((log) => log.action))),
  ];

  return (
    <ContentLayout title="Find Client">
      <BreadcrumbPages
        links={[
          { href: "/", label: "Home" },
          { href: "/audit", label: "Audit" },
        ]}
      />
      {/* Header */}
      <MainHeader
        title="Activity and Audit Logs"
        description="Review a complete record of admin activities for accountability and transparency. Track who made changes, when, and to which records."
      />
      <div>Stats go here</div>
      <div>Tabs Go here</div>
      <div>Tables go here</div>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-5">
        <div className="flex-1 max-w-md">
          <SearchInput
            placeholder="Search by user, action, resource, or details..."
            onSearch={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-foreground">
            Filter by action:
          </label>
          <select
            value={selectedAction}
            onChange={(e) => handleActionFilter(e.target.value)}
            className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            {actions.map((action) => (
              <option key={action} value={action}>
                {action === "all" ? "All Actions" : action}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      {isLoading ? (
        <div className="py-12">
          <LoadingSpinner size="lg" />
        </div>
      ) : (
        <>
          <AuditTable logs={paginatedLogs} />
          {totalPages > 1 && (
            <div className="pt-4">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </>
      )}
    </ContentLayout>
  );
}
