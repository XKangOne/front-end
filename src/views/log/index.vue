<template>
	<el-card shadow="never" class="border-0">
		<!-- 一 -->
		<div class="f-between mb-4">
			<div class="flex justify-start">
				<input
					type="text"
					v-model="title"
					placeholder="请搜索"
					class="text-gray-500 border-gray-300 solid border-1 outline-none rounded-2xl py-1 ml-3 w-60 pl-2 text-sm"
				/>
				<el-button class="px-8 py-4 text-sky-500 rounded-full text-light-50 ml-2" @click="getData">搜索</el-button>
			</div>
			<!-- 刷新图标 -->
			<el-tooltip content="刷新数据" placement="top" effect="dark">
				<el-button text @click="getData">
					<IEpRefresh />
				</el-button>
			</el-tooltip>
		</div>
		<!-- 二 -->
		<el-table :data="tableData" stripe v-loading="loading" class="w-full">
			<el-table-column prop="id" label="用户名" />
			<el-table-column prop="username" label="登录IP" />
			<el-table-column prop="ip" label="登录地点" />
			<el-table-column prop="address" label="userAgent" />
			<el-table-column prop="userAgent" label="登录状态" />
			<el-table-column prop="status" label="操作信息" />
			<el-table-column prop="createTime" label="创建时间" />
		</el-table>
		<!-- 三 -->
		<div class="fixed bottom-8 left-[45%]">
			<el-pagination
				background
				@current-change="getData"
				:currentPage="currentPage"
				:page-size="limit"
				layout="prev,paper,next"
				:total="total"
			>
			</el-pagination>
		</div>
		<!-- 四
        <FormDrawer ref="formDrawerRef" :title="drawerTitle" @Submit="handleSubmit">
            <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="通知标题" prop="title">
                    <el-input v-model="form.title" placeholder="通知标题"></el-input>
                </el-form-item>
                <el-form-item label="通知内容" prop="content">
                   <el-input v-model="form.content" placeholder="通知内容" type="textarea" :rows="5"></el-input>
                </el-form-item>
            </el-form>
        </FormDrawer> -->
	</el-card>
</template>

<script setup>
const { tableData, loading, currentPage, title, limit, total, getData } = useLog()
</script>

<style scoped></style>
