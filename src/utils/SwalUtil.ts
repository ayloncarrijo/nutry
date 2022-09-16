import Swal from "sweetalert2";

class SwalUtil {
  public static confirm(text: string) {
    return Swal.fire({
      icon: "warning",
      text,
      confirmButtonText: "Sim",
      cancelButtonText: "Não",
      showCancelButton: true,
    });
  }

  public static fireSuccess(text = "A requisição foi completada com sucesso!") {
    return Swal.fire({
      icon: "success",
      title: "Tudo certo",
      text,
    });
  }

  public static fireError(text = "Por favor, tente novamente.") {
    return Swal.fire({
      icon: "error",
      title: "Algo deu errado",
      text,
    });
  }
}

export default SwalUtil;
