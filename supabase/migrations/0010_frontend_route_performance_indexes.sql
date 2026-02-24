-- Route performance indexes for dashboard and class overview data access paths.

create index if not exists assignment_recipients_student_assigned_at_idx
on public.assignment_recipients (student_id, assigned_at desc);

create index if not exists assignments_class_created_at_idx
on public.assignments (class_id, created_at desc);

create index if not exists submissions_student_assignment_idx
on public.submissions (student_id, assignment_id);

create index if not exists enrollments_user_class_role_idx
on public.enrollments (user_id, class_id, role);
