<template>
  <div class="list row justify-content-center">
    <div class="col-md-20">
      <div>
        <h4 class="judul">
          Daftar Loookup
        </h4>
      </div>

      <div class="input-group mx-3">
        <input
          type="text"
          class="form-control"
          placeholder="Cari nama"
          v-model="nama"
        />

        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button">
            Search
          </button>
          <div class="tambah">
            <button @click="$router.push('add')" class="btn btn-success">
              Tambah
            </button>
          </div>
        </div>
      </div>
      <div class="table-responsive">
        <table class="table table-striped table-bordered table-hover">
          <thead>
            <tr>
              <th>Group Name</th>
              <th>Description</th>
              <th class="action">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="lookup in lookups" :key="lookup.id">
              <td>{{ lookup.group_name }}</td>
              <td>{{ lookup.description }}</td>
              <td class="edit">
                <button @click="editData(lookup.id)" class="btn btn-primary">
                  Edit
                </button>
                <button @click="deleteData(lookup.id)" class="btn btn-danger">
                  Hapus
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";

export default {
  name: "lookups-list",
  data() {
    return {
      lookups: [],
    };
  },
  methods: {
    editData(id) {
      this.$router.push({ name: "edit", params: { id } });
    },
    async getLookupAll() {
      const lookupDb = await EmployeeService.getAllLookup();
      this.lookups = lookupDb.data;
    },
    deleteData(id) {
      if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
        EmployeeService.delete(id)
          .then(() => {
            alert("Data berhasil dihapus");
            this.getLookupAll();
          })
          .catch((error) => {
            console.log(error);
            alert("Terjadi kesalahan saat menghapus data");
          });
      }
    },
  },
  mounted() {
    this.getLookupAll();
  },
};
</script>

<style src="./EmployeeList.css"></style>
