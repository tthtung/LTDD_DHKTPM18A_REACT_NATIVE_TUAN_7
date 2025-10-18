# Task Manager - Hướng dẫn CRUD

## 🎯 Tính năng đã hoàn thiện

### ✅ CREATE (Thêm Task)
- **Màn hình**: `add-job.tsx`
- **Cách sử dụng**: 
  1. Từ màn hình Tasks, nhấn nút FAB (+) ở dưới cùng
  2. Nhập tên task vào ô input
  3. Nhấn nút "FINISH →" để thêm task
  4. Task mới sẽ xuất hiện trong danh sách với trạng thái "chưa hoàn thành"

### ✅ READ (Đọc/Xem Task)
- **Màn hình**: `tasks.tsx`
- **Tính năng**:
  - Xem danh sách tất cả tasks
  - Tìm kiếm tasks theo tên (real-time search)
  - Hiển thị số lượng tasks
  - Empty state khi không có task nào

### ✅ UPDATE (Sửa Task)
- **Màn hình**: `edit-job.tsx`
- **Cách sử dụng**:
  1. Từ danh sách tasks, nhấn icon ✏️ bên cạnh task
  2. Chỉnh sửa tên task trong ô input
  3. Nhấn "UPDATE ✓" để lưu thay đổi
  4. Task được cập nhật ngay lập tức

### ✅ DELETE (Xóa Task)
- **Cách 1**: Trong danh sách tasks
  - Nhấn icon 🗑️ bên cạnh task
  - Xác nhận xóa trong dialog
  
- **Cách 2**: Trong màn hình edit
  - Nhấn icon 🗑️ ở góc trên bên phải
  - Xác nhận xóa trong dialog

### ✅ TOGGLE (Đánh dấu hoàn thành)
- **Cách sử dụng**: 
  - Nhấn vào checkbox bên trái task
  - Task sẽ có dấu ✓ và gạch ngang khi hoàn thành
  - Nhấn lại để bỏ đánh dấu

## 📁 Cấu trúc File

```
app/
├── _layout.tsx          # Root layout với TaskProvider
├── index.tsx            # Redirect to welcome
├── welcome.tsx          # Màn hình nhập tên
├── tasks.tsx            # Danh sách tasks (READ, DELETE, TOGGLE)
├── add-job.tsx          # Thêm task mới (CREATE)
└── edit-job.tsx         # Chỉnh sửa task (UPDATE, DELETE)

contexts/
└── TaskContext.tsx      # Global state management với Context API
```

## 🔧 Kiến trúc

### Context API (TaskContext.tsx)
```typescript
interface TaskContextType {
  tasks: Task[];           // Danh sách tasks
  addTask: (text: string) => void;        // Thêm task
  updateTask: (id: string, text: string) => void;  // Sửa task
  deleteTask: (id: string) => void;       // Xóa task
  toggleTask: (id: string) => void;       // Toggle done/undone
}
```

### Task Model
```typescript
interface Task {
  id: string;      // Unique ID (timestamp)
  text: string;    // Nội dung task
  done: boolean;   // Trạng thái hoàn thành
}
```

## 🚀 Cách chạy ứng dụng

```bash
# Cài đặt dependencies
npm install

# Chạy app
npx expo start

# Chọn platform
# - Nhấn 'w' cho Web
# - Nhấn 'a' cho Android
# - Nhấn 'i' cho iOS
```

## 🎨 UI/UX Features

- ✅ Animations khi nhấn button
- ✅ Shadow effects đẹp mắt
- ✅ Empty state khi không có task
- ✅ Real-time search
- ✅ Confirmation dialogs khi xóa
- ✅ Success alerts khi thêm/sửa
- ✅ Disabled state cho buttons
- ✅ Icon emojis sinh động
- ✅ Responsive layout

## 📝 Ghi chú

- Tasks được lưu trong memory (useState), sẽ mất khi reload app
- Để lưu vĩnh viễn, cần tích hợp AsyncStorage hoặc database
- ID của task được generate bằng timestamp (Date.now())
- Modal presentation cho add/edit screens
