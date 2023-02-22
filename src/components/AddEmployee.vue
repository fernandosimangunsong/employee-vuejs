<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="nama">NIK</label>
        <input
          type="text"
          class="form-control"
          id="nik"
          required
          v-model="bean.nik"
          name="nik"
        />
      </div>

      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          id="name"
          required
          v-model="bean.name"
          name="name"
        />
      </div>
      <div class="form-group">
        <label for="hired_date">Hired Date</label>
        <input
          type="date"
          class="form-control"
          id="hired_date"
          required
          v-model="bean.hired_date"
          name="hired_date"
          format="yyyy-MM-dd"
        />
      </div>
      <div class="form-group">
        <label for="expired_date">Expired Date</label>
        <input
          type="date"
          class="form-control"
          id="expired_date"
          required
          v-model="bean.expired_date"
          name="expired_date"
        />
      </div>
      <div class="form-group">
        <label for="salary">Salary</label>
        <input
          type="text"
          class="form-control"
          id="salary"
          required
          v-model="bean.salary"
          name="salary"
        />
      </div>
      <div class="form-group">
        <label for="birth_date">Birth Date</label>
        <input
          type="date"
          class="form-control"
          id="birth_date"
          required
          v-model="bean.birth_date"
          name="birth_date"
        />
      </div>
      <div class="form-group">
        <label for="npwp">NPWP</label>
        <input
          type="text"
          class="form-control"
          id="npwp"
          required
          v-model="bean.npwp"
          name="npwp"
        />
      </div>
      

    
       <div class="form-group">
        <p>please select Jenis Kelamin</p>
        <select v-model="testVal">
           <option v-for="(item, index) in jk" :value="item.id" :key="index"> {{item.description}} </option>
      </select>
      </div>

      <div class="form-group">
        <label for="type">Type</label>
        <input
          type="text"
          class="form-control"
          id="type"
          required
          v-model="bean.type"
          name="type"
        />
      </div>
      <div class="tombol">
        <button @click="saveEmployee" class="btn btn-success">Submit</button>
        <button class="btn btn-primary" onclick="location.href='/employee'">
          Cancel
        </button>
      </div>
    </div>

    <div v-else class="text-center">
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newEmployee">Add</button>
      <button class="btn btn-primary" onclick="location.href='/employee'">
        Back
      </button>
    </div>
  </div>
</template>

<script>
import EmployeeService from "../services/EmployeeService";
import { format_date } from "../convertdate";
export default {
  name: "add-employee",
  data() {
    return {
      test: ['one', 'two', 'three'],
      jk: [
        {
          id: 1,
          description: "LAKI-LAKI"
        },
        {
          id: 2,
          description: "PEREMPUAN"
        },
      ],
      testVal: null,
      sex_items: [],
      bean: {
        id: null,
        nik: null,
        name: null,
        hired_date: null,
        expired_date: null,
        salary: null,
        birth_date: null,
        npwp: null,
        sex: null,
        type: null,
      },
      submitted: false,
      action: "ADD"
    };
  },
  components: {
  },
  mounted() {
    console.log("tes", this.$route.params.id);

    if (this.$route.params.id) {
  
      EmployeeService.getEmployeeID(this.$route.params.id)
        .then((response) => {
          this.bean = response.data;
          this.bean.hired_date = format_date(this.bean.hired_date);
          this.bean.expired_date = format_date(this.bean.expired_date);
          this.bean.birth_date = format_date(this.bean.birth_date);
          this.action = "EDIT";
        })
        .catch((e) => {
          console.log(e);
        });
    }

      EmployeeService.getListSex()
        .then((response) => {
           console.log("data sex:" , response.data);
           response.data.forEach((value, index) => {
              this.sex_items.push(value);
              console.log(value);
              console.log(index);
          });
           //this.sex_items = response.data
          //  this.dropdown_items_jenis_kelamin = response.data;
          //  console.log("data dropdown_items_jenis_kelamin:" , response.data);
        })
        .catch((e) => {
          console.log(e);
        });
  },
  methods: {
    saveEmployee() {
      EmployeeService.create(this.bean)
        .then((response) => {
          this.bean.id = response.data.id;
          this.submitted = true;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    newEmployee() {
      this.submitted = false;
      this.bean = {};
    },
  },
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.tombol {
  align-items: center;
  justify-content: center;
  display: flex;
  /* padding: center; */
}
/* .container {
  /* display: flex; */
/* justify-content: center; */
/* align-items: center; */
/* height: 100vh; */

/* .content h4 {
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
}

.content button {
  margin-right: 10px;
} */
</style>
