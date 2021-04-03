<template>
  <div class="home">
    <div class="works" v-if="works.length">
      <WorkPreview
        v-for="(work, idx) in works"
        :key="idx"
        :work="work"
      ></WorkPreview>
    </div>
  </div>
</template>

<script>
import WorkPreview from "../components/WorkPreview";

export default {
  name: "Works",
  components: {
    WorkPreview
  },
  data() {
    return {
      works: []
    };
  },
  mounted() {
    this.setTitle("Works");

    fetch("http://localhost:3000/works")
      .then(response => response.json())
      .then(data => {
        console.log(data);
        this.works = data;
      });
  }
};
</script>
