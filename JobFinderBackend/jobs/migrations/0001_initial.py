# Generated by Django 5.0.3 on 2024-04-02 16:45

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Job',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('company_name', models.CharField(max_length=255)),
                ('role', models.CharField(max_length=255)),
                ('location', models.CharField(max_length=255)),
                ('type', models.CharField(choices=[('full_time', 'Full Time'), ('part_time', 'Part Time')], max_length=20)),
                ('description', models.TextField()),
                ('time_interval', models.CharField(max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='User',
            fields=[
                ('username', models.CharField(max_length=13, primary_key=True, serialize=False)),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255, unique=True)),
                ('phone', models.CharField(max_length=10, validators=[django.core.validators.MinLengthValidator(10)])),
                ('gender', models.CharField(max_length=20)),
                ('age', models.IntegerField()),
                ('experience', models.CharField(max_length=50)),
                ('password', models.CharField(max_length=30, validators=[django.core.validators.MinLengthValidator(5)])),
            ],
        ),
        migrations.CreateModel(
            name='Apply',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobs.job')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='jobs.user')),
            ],
        ),
    ]
