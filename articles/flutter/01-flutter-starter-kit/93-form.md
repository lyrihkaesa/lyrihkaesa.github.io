# 📝 Dokumentasi Form & Validation – Flutter Starter Kit

## 📦 Package yang Digunakan

Untuk membangun form yang konsisten, kita pakai beberapa package utama:

- [`flutter_form_builder`](https://pub.dev/packages/flutter_form_builder)  
    → Memberikan abstraction lebih baik untuk form, validator built-in, `FormBuilderState`, dan integrasi mudah untuk error handling.   
- [`form_builder_validators`](https://pub.dev/packages/form_builder_validators)  
    → Kumpulan validator siap pakai (required, email, minLength, dsb).
- [`flutter_bloc`](https://pub.dev/packages/flutter_bloc)  
    → Untuk state management dan event-driven form submission.
- [`freezed`](https://pub.dev/packages/freezed)  
    → Untuk membuat `sealed class` state/event yang clean.
- [`injectable`](https://pub.dev/packages/injectable) + [`get_it`](https://pub.dev/packages/get_it)  
    → Untuk dependency injection, supaya tiap layer tidak saling ketergantungan secara langsung.

## 📋 Validation Input: Client vs Server

### ✅ Client-side validation

Dilakukan langsung di UI sebelum request dikirim ke server.  
Contoh rules umum:

- **Name**: required, minLength(3)
- **Email**: required, format email valid
- **Password**: required, minLength(8), harus ada angka/huruf besar

Tujuan: mengurangi request ke server untuk input yang jelas-jelas salah.

### 🌐 Server-side validation

Dilakukan setelah request dikirim ke API.  
Server bisa mengembalikan error per-field atau global error.  
Contoh (response JSON Laravel/Express/NestJS):

```json
{
  "message": "The given data was invalid.",
  "errors": {
    "email": ["The email has already been taken."],
    "password": ["Password must contain at least one symbol."]
  }
}
```

📌 **Best practice:**

- Client tetap validasi, meski server juga validasi (defense in depth).
- UI harus siap menerima **per-field errors dari server**, lalu ditampilkan langsung di form.

## 🎛️ Form Validation Mode di Flutter

Flutter (dan `FormBuilder`) menyediakan **tiga mode utama** untuk menampilkan error:

- `AutovalidateMode.disabled`  
    → Error hanya muncul setelah `formKey.currentState!.validate()` dipanggil (biasanya saat submit).
- `AutovalidateMode.onUserInteraction`  
    → Error baru muncul setelah user menyentuh field minimal sekali, lalu keluar dari field.
- `AutovalidateMode.always`  
    → Error ditampilkan secara realtime setiap kali user mengetik (cocok untuk UX interaktif, tapi kadang terasa “judgy” kalau dipakai untuk semua field).

📌 **Rekomendasi Starter Kit:**

- Gunakan `onUserInteraction` untuk form register/login (balance UX).
- Gunakan `always` untuk field sensitif (misalnya password strength meter).
- Gunakan `disabled` hanya kalau kamu ingin error muncul sekali saja saat submit.

---

## 🏗️ Flow Arsitektur

```
UI (RegisterPage, FormBuilder)
   ↓ Bloc (RegisterBloc)
      ↓ UseCase (Register)
         ↓ Repository (AuthRepository)
            ↓ RemoteDataSource (AuthRemoteDataSource)
            ↓ LocalDataSource (AuthLocalDataSource)
```

---

## 🔧 UseCase (Register)

```dart
@Injectable()
class Register {
  final AuthRepository repository;

  Register(this.repository);

  Future<Either<Failure, UserEntity>> call({
    required String name,
    required String email,
    required String password,
  }) {
    return repository.register(
      name: name,
      email: email,
      password: password,
    );
  }
}
```

---

## 🎛️ Bloc

```dart
sealed class RegisterEvent {}
class RegisterSubmitted extends RegisterEvent {
  final String name;
  final String email;
  final String password;
  RegisterSubmitted(this.name, this.email, this.password);
}

@freezed
class RegisterState with _$RegisterState {
  const factory RegisterState.initial() = _Initial;
  const factory RegisterState.loading() = _Loading;
  const factory RegisterState.success(UserEntity user) = _Success;
  const factory RegisterState.failure(Failure failure) = _Failure;
}

@Injectable()
class RegisterBloc extends Bloc<RegisterEvent, RegisterState> {
  final Register register;

  RegisterBloc(this.register) : super(const RegisterState.initial()) {
    on<RegisterSubmitted>(_onSubmitted);
  }

  Future<void> _onSubmitted(
    RegisterSubmitted event,
    Emitter<RegisterState> emit,
  ) async {
    emit(const RegisterState.loading());

    final result = await register(
      name: event.name,
      email: event.email,
      password: event.password,
    );

    result.fold(
      (failure) => emit(RegisterState.failure(failure)),
      (user) => emit(RegisterState.success(user)),
    );
  }
}
```

## 🖼️ UI (Register Page)

```dart
class RegisterPage extends StatelessWidget {
  RegisterPage({super.key});

  final _formKey = GlobalKey<FormBuilderState>();

  @override
  Widget build(BuildContext context) {
    return BlocProvider(
      create: (_) => getIt<RegisterBloc>(),
      child: Scaffold(
        appBar: AppBar(title: const Text("Register")),
        body: BlocConsumer<RegisterBloc, RegisterState>(
          listener: (context, state) {
            state.whenOrNull(
              success: (user) {
                ScaffoldMessenger.of(context).showSnackBar(
                  const SnackBar(content: Text("Register success!")),
                );
              },
              failure: (failure) {
                if (failure is ValidationFailure) {
                  // Error per-field dari server
                  final errors = failure.errors;
                  errors.forEach((field, messages) {
                    _formKey.currentState?.invalidateField(
                      name: field,
                      errorText: messages.join(", "),
                    );
                  });
                } else {
                  // Error global
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text(failure.toString())),
                  );
                }
              },
            );
          },
          builder: (context, state) {
            final bloc = context.read<RegisterBloc>();
            return Padding(
              padding: const EdgeInsets.all(16),
              child: FormBuilder(
                key: _formKey,
                autovalidateMode: AutovalidateMode.onUserInteraction,
                child: Column(
                  children: [
                    FormBuilderTextField(
                      name: "name",
                      decoration: const InputDecoration(labelText: "Name"),
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(),
                        FormBuilderValidators.minLength(3),
                      ]),
                    ),
                    FormBuilderTextField(
                      name: "email",
                      decoration: const InputDecoration(labelText: "Email"),
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(),
                        FormBuilderValidators.email(),
                      ]),
                    ),
                    FormBuilderTextField(
                      name: "password",
                      decoration: const InputDecoration(labelText: "Password"),
                      obscureText: true,
                      validator: FormBuilderValidators.compose([
                        FormBuilderValidators.required(),
                        FormBuilderValidators.minLength(8),
                      ]),
                    ),
                    const SizedBox(height: 16),
                    ElevatedButton(
                      onPressed: state is _Loading
                          ? null
                          : () {
                              if (_formKey.currentState?.saveAndValidate() ??
                                  false) {
                                final values = _formKey.currentState!.value;
                                bloc.add(RegisterSubmitted(
                                  values['name'],
                                  values['email'],
                                  values['password'],
                                ));
                              }
                            },
                      child: state is _Loading
                          ? const CircularProgressIndicator()
                          : const Text("Register"),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
```

---

## 📌 Ringkasan Best Practice

- **Selalu pakai client-side validation** (UX lebih baik).
- **Selalu tangani server-side validation** (supaya UI tidak crash kalau ada error spesifik server).
- Gunakan `AutovalidateMode.onUserInteraction` sebagai default.
- Tangani error per-field server dengan `invalidateField`.
- Simpan logika validasi berat di server (misalnya email sudah terdaftar, password strength rules).
