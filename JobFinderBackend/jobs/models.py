from django.db import models
from django.core.validators import MinLengthValidator

class User(models.Model):
    username = models.CharField(max_length=13, primary_key=True)
    name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    phone = models.CharField(max_length=10, validators=[MinLengthValidator(10)], unique=True)
    gender = models.CharField(max_length=20)
    age = models.IntegerField()
    experience = models.CharField(max_length=50)
    password = models.CharField(max_length=30, validators=[MinLengthValidator(5)])


class Job(models.Model):
    FULL_TIME = 'full_time'
    PART_TIME = 'part_time'
    TYPE_CHOICES = [
        (FULL_TIME, 'Full Time'),
        (PART_TIME, 'Part Time'),
    ]
    company_name = models.CharField(max_length=255)
    role = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    description = models.TextField()
    time_interval = models.CharField(max_length=100, null=True)

class Apply(models.Model):
    PENDING = 'pending'
    INTERVIEW = 'interview'
    OFFER = 'offer'
    REJECT = 'reject'
    STATUS_CHOICES = [
        (PENDING, 'Pending'),
        (INTERVIEW, 'Interview'),
        (OFFER, 'Offer'),
        (REJECT, 'Reject'),
    ]

    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)