"use client";

import Link from "next/link";
import type { AccountType } from "@/lib/auth/session";

type Breadcrumb = {
  label: string;
  href?: string;
};

type HeaderProps = {
  breadcrumbs?: Breadcrumb[];
  accountType?: AccountType;
  classContext?: {
    classId: string;
    classTitle: string;
    isTeacher: boolean;
  };
};

export default function Header({ breadcrumbs, accountType, classContext }: HeaderProps) {
  const resolvedAccountType = accountType ?? "student";
  const dashboardHref = resolvedAccountType === "teacher" ? "/teacher/dashboard" : "/student/dashboard";

  return (
    <header className="sticky top-0 z-40 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white px-6 dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-4">
        {/* Breadcrumbs */}
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-2 text-sm">
            <Link href={dashboardHref} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
              Home
            </Link>
            {breadcrumbs.map((crumb, index) => {
              const isLast = index === breadcrumbs.length - 1;
              return (
                <span key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                  <span className="text-slate-300 dark:text-slate-600">/</span>
                  {crumb.href && !isLast ? (
                    <Link href={crumb.href} className="text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span className="font-medium text-slate-900 dark:text-white">{crumb.label}</span>
                  )}
                </span>
              );
            })}
          </nav>
        )}
      </div>

      <div className="flex items-center gap-3">
        {classContext && (
          <Link
            href={`/classes/${classContext.classId}`}
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 014.5 9.75h15A2.25 2.25 0 0121.75 12v.75m-8.69-6.44l-2.12-2.12a1.5 1.5 0 00-1.061-.44H4.5A2.25 2.25 0 002.25 6v12a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9a2.25 2.25 0 00-2.25-2.25h-5.379a1.5 1.5 0 01-1.06-.44z" />
            </svg>
            <span className="max-w-[150px] truncate">{classContext.classTitle}</span>
          </Link>
        )}

        {accountType === "teacher" && (
          <Link
            href="/classes/new"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>New Class</span>
          </Link>
        )}

        {accountType === "student" && (
          <Link
            href="/join"
            className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            <span>Join Class</span>
          </Link>
        )}
      </div>
    </header>
  );
}
